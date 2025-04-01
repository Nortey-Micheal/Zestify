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
      <SelectTrigger className="w-[280px] cursor-pointer">
        <SelectValue placeholder="Sort by ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer" value="/recipes/">All</SelectItem>
          <SelectItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer" value="new">Newest</SelectItem>
          <SelectItem className="focus:bg-(--zesty-orange) focus:text-(--white)  cursor-pointer" value="popular">Popularity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
