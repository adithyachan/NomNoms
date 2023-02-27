import { Modal,
         CopyButton, 
         Tooltip, 
         ActionIcon,
         Center,
         TextInput, 
         Title } from "@mantine/core"
import { IconCopy, IconCheck } from '@tabler/icons'

export default function CodeModal(props: { code: string, open: boolean, handler: any }) {
  const link = process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/" + props.code

  const copy = (link: string) => (
    <CopyButton value={ link } timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )

  return (
    <>
    <Modal
      opened={props.open}
      onClose={() => props.handler.close()}
      withCloseButton={false}
      overlayBlur={3}
      radius="lg"
      centered
      closeOnClickOutside
      closeOnEscape
    >
      <Center className="flex-col space-y-3">
        <Title order={5}>Share with other Nomsters</Title>
        <TextInput 
          disabled
          value={process.env.NEXT_PUBLIC_VERCEL_URL + "/tables/" + props.code}
          rightSection={
            copy(link)
          }
        />
        <small>or</small>
        <TextInput 
          disabled 
          value={props.code}
          rightSection={
            copy(props.code)
          } 
        />
      </Center>
    </Modal>
    </>
  )
}