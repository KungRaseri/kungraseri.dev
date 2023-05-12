type Action = {
    text: string,
    href: string
}

export type Project = {
    id: number,
    title: string,
    url: string,
    image: string,
    description: string,
    actions: Action[]
}

export type Album = {
    id: number,
    title: string,
    url: string,
    image: string,
    description: string,
    actions: Action[]
}