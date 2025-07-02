import { ComponentPropsWithoutRef } from 'react'

type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>

export const OrderedList = (props: ListProps) => <ol {...props} />

export const UnorderedList = (props: ListProps) => <ul {...props} />

export const ListItem = (props: ListItemProps) => <li {...props} />
