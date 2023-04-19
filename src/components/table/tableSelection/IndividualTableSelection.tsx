import { Group, Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function IndividualSelectionLayout(props  : any) {
    const router = useRouter()  
    const joinTable = async (e : any) => {
        router.push('tables/individual-table')
    }
    
    return (
        <>
        <Group>
            <Button color="red" size="xs" compact  onClick={joinTable}>
               Let&apos;s Eat! 
            </Button>
          </Group>
          </>
    )
}