import { Card } from "@heroui/react"
import type { PropsWithChildren } from "react"

type StatusTextProps = PropsWithChildren<{
  tone?: "default" | "danger"
}>

export const StatusText = ({ tone = "default", children }: StatusTextProps) => {
  return (
    <Card.Description className={tone === "danger" ? "text-danger" : undefined}>
      {children}
    </Card.Description>
  )
}
