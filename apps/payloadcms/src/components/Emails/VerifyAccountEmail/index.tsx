import { Button, Html, Text } from '@react-email/components'

export const VerifyAccountEmail = async ({ url, name }: { url: string; name: string }) => {
  return (
    <Html>
      <Text
        style={{
          marginBottom: '24px',
          color: '#000',
          display: 'block',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        {`Hello ${name},`}
      </Text>
      <Text
        style={{
          marginBottom: '24px',
          color: '#000',
          display: 'block',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        Click the link below to verify your email
      </Text>
      <Button
        href={url}
        style={{
          background: '#000',
          color: '#fff',
          padding: '12px 20px',
          backgroundColor: '#6366f1',
          margin: '0 auto',
        }}
      >
        Verify email
      </Button>
    </Html>
  )
}
