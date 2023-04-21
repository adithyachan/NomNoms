import { useState } from "react"
import { Button, Center, TextInput, Tooltip, Container, MantineProvider, Modal, Progress, Text } from "@mantine/core"
import { useInputState, useDisclosure } from '@mantine/hooks';

import { Table, ITable } from "@/types/Table"
import { WriteTable } from "@/lib/firebase/table/TableOperations"
import { Timestamp } from "firebase/firestore"
import CodeModal from "./CodeModal";
import { useUser } from "@/providers/AuthProvider";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";

import { getRestaurantList } from "@/lib/utils/yelpAPI";
import { showNotification, NotificationsProvider } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import data from "valid-zips.json"

const special_chars = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?]/
const numFetch = 50;

export default function CreateTable() {
  const { user } = useUser()
  const [value, setValue] = useInputState('');
  const [zip, setZip] = useInputState('');
  const [date, setDate] = useInputState(new Date());
  const [desc, setDesc] = useInputState('');
  const [time, setTime] = useInputState(new Date());

  const [loadingState, setLoadingState] = useState<string>("idle");
  const [loadPer, setLoadPer] = useState<number>(0);
  const [error, setError] = useState<any>(null)
  const [openedName, inputHandlersName] = useDisclosure();
  const [openedZip, inputHandlersZip] = useDisclosure();
  const [openedDesc, inputHandlersDesc] = useDisclosure();
  const [openedDate, inputHandlersDate] = useDisclosure();

  // show code modal
  const [codeOpen, codeHandlers] = useDisclosure();
  const [code, setCode] = useState("");

  // Input validation
  const special_chars_check = !special_chars.test(value)
  const length_check = value.length >= 4 && value.length <= 16
  const zip_check = zip.length == 5 && !Number.isNaN(zip) && zipisvalid()
  const valid = special_chars_check && length_check && zip_check
  function zipisvalid() {
    if (zip.length!=5) {
      return false
    }
    if (data.includes(zip) ) {
      return true
    }
    return false
  }
  const getRestaurantFirstTime = async (n: number = 5) => {
    let data: any[] = []
    let per = 0
    for (let i = 0; i < n; i++) {
      try {
        const res = await getRestaurantList(numFetch, zip, 10000, "food", i * numFetch)
        const resJSON = await res.json()
        per += 100 / n
        setLoadPer(per);
        if (res.status >= 400) {
          showNotification({
            title: "Yikes",
            message: resJSON.error,
            icon: <IconX />,
            color: "red"
          })
        }
        else if(res.ok) {
          data = data.concat(resJSON.businesses)
        }
      }
      catch (err) {
        showNotification({
          title: "Yikes",
          message: "Failed to fetch data",
          icon: <IconX />,
          color: "red"
        })
        setError(err)
        console.log(err)
        return undefined
      }
    }

    return data
  }

  const handleTableCreation = async () => {
    setLoadingState("Fetching Restaurant Data...")
    setLoadPer(0)

    const restaurantData = await getRestaurantFirstTime()

    if (!restaurantData) {
      setLoadingState(error)
      return
    }

    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
    const timestamp = Timestamp.fromDate(dateTime);
    const tableJSON: ITable = {
      id: "",
      name: value,
      lastAccessed: Timestamp.fromDate(new Date()),
      users: {},
      leader: user?.uid!,
      banned: [],
      prefs: {
        zip: zip,
        cuisine: "food",
        price: ""
      },
      expiration: Timestamp.fromDate(new Date((new Date()).getTime() + 60 * 60 * 24 * 1000)),
      numDoneVoting: 0,
      description: desc,
      date: timestamp,
      prefsDone: [],
      restaurantList: restaurantData
    }
    tableJSON.users[user?.uid!] = {}

    setLoadingState("Writing to Database...")
    const table = new Table(tableJSON)
    try {
      const code = await WriteTable(table)
      setValue('')
      setZip('')
      setDesc('')
      setDate(new Date())
      setCode(code!)
      codeHandlers.open()
    }
    catch (e: any) {
      showNotification({
        title: "Yikes",
        message: "Failed to write to database",
        icon: <IconX />,
        color: "red"
      })
      setError(e)
      setLoadingState("Failed to write to database")
    }
    setLoadingState("Done")
  }

  return (
    <>
      <NotificationsProvider />
      <Modal opened={ loadingState == "Fetching Restaurant Data..." || loadingState == "Writing to Database..." } withCloseButton={ false } centered onClose={ () => {} }>
        <Text className="text-center">{ loadingState }</Text>
        <Progress animate value={ loadPer } color="red" radius="xl" size="xl"/>
      </Modal>
      {codeOpen ? <CodeModal code={ code } open={ codeOpen } handler={ codeHandlers }/> : null} 
      <Container fluid className="pb-4">
        <Tooltip
          label={length_check ? special_chars_check ? null : "No special characters" : "Name must be 4-16 characters"}
          position="left"
          withArrow
          opened={openedName && !(length_check && special_chars_check)}
          color={"red.8"}>
          <TextInput
            placeholder="Table Name"
            onFocus={() => inputHandlersName.open()}
            onBlur={() => inputHandlersName.close()}
            mt="md"
            value={value}
            onChange={setValue}
          />
        </Tooltip>
        {error ? 
          <>
            Error
          </>
          : 
          <></>
          
        }
        <Tooltip
          label={zip_check ? null : "Invalid Zip Code"}
          position="left"
          withArrow
          opened={openedZip && !zip_check}
          color={"red.8"}>
          <TextInput
            placeholder="Zip Code"
            onFocus={() => inputHandlersZip.open()}
            onBlur={() => inputHandlersZip.close()}
            mt="md"
            value={zip}
            onChange={setZip}
          />
        </Tooltip>
        
        <TextInput
          placeholder="Event Description"
          onFocus={() => inputHandlersDesc.open()}
          onBlur={() => inputHandlersDesc.close()}
          mt="md"
          value={desc}
          onChange={setDesc}
          
        />
       
        <DatePicker
          mt="md"
          value={date}
          onChange={setDate}
          placeholder="Pick a date"
          id="my-date-picker"
          name="my-date-picker"
          minDate={new Date()}
          icon={<IconCalendar size={16} />}
          clearable={false}
        />

        <TimeInput 
          mt="md"
          format="12" 
          defaultValue={new Date()} 
          value={time}
          onChange={setTime}
          icon={<IconClock size={16} />}
        />


      </Container>
<Center>
  <Button  color="red" disabled={!valid} onClick={handleTableCreation}>Create</Button>
</Center>
      

    </>
  )
}