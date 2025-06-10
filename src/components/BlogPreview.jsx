import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export function BlogPreview({ title, excerpt, author, date, image }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="p-4">
        <a href="#" className="hover:underline">
          <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
        </a>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <span>{author}</span>
        <span>{date}</span>
      </CardFooter>
    </Card>
  )
}
