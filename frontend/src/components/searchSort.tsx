import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LucideProps } from "lucide-react"
import { useNavigate } from "react-router"

 export interface SortType {
  link: string,
  type: string
  Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export default function SearchSort({sortBy}:{sortBy:SortType[]}) {
  const navigate = useNavigate()

  return (
    <Select onValueChange={(e) => navigate(`${e}`)}>
      <SelectTrigger className="w-[280px] cursor-pointer">
        <SelectValue placeholder="Sort by ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          {
            sortBy.map(sort => (
              <SelectItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer" value={`${sort.link}`}>{sort.Icon &&<sort.Icon className="w-3 h-3 text-[inherite] "/>}{sort.type}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
