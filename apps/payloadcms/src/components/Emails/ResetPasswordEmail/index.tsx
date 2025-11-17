import { Button, Html, Text } from '@react-email/components'
// import { getTranslations } from "next-intl/server";
import * as React from 'react'

// import { type Locale } from "@/i18n/config";

export const ResetPasswordEmail = async ({
  url,
  locale = 'en',
  name,
}: {
  url: string
  locale: string
  name: string
}) => {
  // const t = await getTranslations({ locale, namespace: "Emails.reset-password" });
  // console.log(name);
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
        {`Hello ${name},`},
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
        Someone requested a password reset for your account. If it wasn't you, ignore this email.
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
        Reset password
      </Button>
    </Html>
  )
}
