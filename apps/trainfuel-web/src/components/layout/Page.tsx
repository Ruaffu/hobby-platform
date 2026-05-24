import { Card } from "@heroui/react"
import type { PropsWithChildren, ReactNode } from "react"

type PageProps = PropsWithChildren

export const Page = ({ children }: PageProps) => {
  return <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-6">{children}</div>
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

type DashboardGridProps = PropsWithChildren

export const DashboardGrid = ({ children }: DashboardGridProps) => {
  return <div className="grid gap-6 xl:grid-cols-2">{children}</div>
}

type AppGridProps = PropsWithChildren

export const AppGrid = ({ children }: AppGridProps) => {
  return <div className="grid gap-6 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">{children}</div>
}

type StackProps = PropsWithChildren

export const Stack = ({ children }: StackProps) => {
  return <div className="flex flex-col gap-6">{children}</div>
}
