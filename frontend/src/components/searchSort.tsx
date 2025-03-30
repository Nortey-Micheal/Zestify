import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router"

export default function SearchSort() {
  const navigate = useNavigate()

  return (
    <Select onValueChange={(e) => navigate(`${e}`)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="/recipes/">All</SelectItem>
          <SelectItem value="new">Newest</SelectItem>
          <SelectItem value="popular">Popularity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
