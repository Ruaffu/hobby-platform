import { Card, Label } from "@heroui/react"
import type { ComponentProps } from "react"

type ThemedCardProps = ComponentProps<typeof Card>

export const ThemedCard = ({ className, ...props }: ThemedCardProps) => {
  return <Card className={`trainfuel-card ${className ?? ""}`} {...props} />
}

type ThemedCardTitleProps = ComponentProps<typeof Card.Title>

export const ThemedCardTitle = ({
  className,
  ...props
}: ThemedCardTitleProps) => {
  return (
    <Card.Title
      className={`trainfuel-card-title ${className ?? ""}`}
      {...props}
    />
  )
}

type ThemedCardDescriptionProps = ComponentProps<typeof Card.Description>

export const ThemedCardDescription = ({
  className,
  ...props
}: ThemedCardDescriptionProps) => {
  return (
    <Card.Description
      className={`trainfuel-card-description ${className ?? ""}`}
      {...props}
    />
  )
}

type ThemedLabelProps = ComponentProps<typeof Label>

export const ThemedLabel = ({ className, ...props }: ThemedLabelProps) => {
  return <Label className={`trainfuel-label ${className ?? ""}`} {...props} />
}