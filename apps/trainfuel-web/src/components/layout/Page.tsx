import { Card } from "@heroui/react"
import type { PropsWithChildren, ReactNode } from "react"

type PageProps = PropsWithChildren

export const Page = ({ children }: PageProps) => {
  return (
    <Card className="mx-auto min-h-screen max-w-5xl p-6">
      <Card.Content className="flex flex-col gap-8">{children}</Card.Content>
    </Card>
  )
}

type PageHeaderProps = {
  title: string
  description?: string
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>

        {description ? <Card.Description>{description}</Card.Description> : null}
      </Card.Header>
    </Card>
  )
}

type SectionCardProps = PropsWithChildren<{
  title: string
  description?: string
  action?: ReactNode
}>

export const SectionCard = ({ title, description, action, children }: SectionCardProps) => {
  return (
    <Card>
      <Card.Header className="flex items-start justify-between gap-4">
        <Card.Content className="p-0">
          <Card.Title>{title}</Card.Title>

          {description ? <Card.Description>{description}</Card.Description> : null}
        </Card.Content>

        {action}
      </Card.Header>

      <Card.Content>{children}</Card.Content>
    </Card>
  )
}
