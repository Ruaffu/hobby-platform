import { Card } from "@heroui/react"
import type { PropsWithChildren, ReactNode } from "react"

type PageProps = PropsWithChildren

export const Page = ({ children }: PageProps) => {
  return <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-6">{children}</div>
}

type PageHeaderProps = {
  title: string
  description?: string
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold">{title}</h1>

      {description ? <p className="text-default-500">{description}</p> : null}
    </div>
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
        <div className="flex flex-col gap-1">
          <Card.Title>{title}</Card.Title>

          {description ? <Card.Description>{description}</Card.Description> : null}
        </div>

        {action}
      </Card.Header>

      <Card.Content>{children}</Card.Content>
    </Card>
  )
}
