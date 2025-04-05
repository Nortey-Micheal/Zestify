import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
export default function PaginationComponent() {
  return (
    <Pagination className="m-1 mt-10 w-full mx-auto p-2 bg-(--white) rounded-lg  ">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className=" text-lg  hover:bg-(--rich-brown) hover:text-(--white) " />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="active:bg-(--zesty-orange) active:text-(--white) text-lg  hover:bg-(--rich-brown) hover:text-(--white) ">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="active:bg-(--zesty-orange) active:text-(--white) text-lg  hover:bg-(--rich-brown) hover:text-(--white) ">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="active:bg-(--zesty-orange) active:text-(--white) text-lg  hover:bg-(--rich-brown) hover:text-(--white) ">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className=" text-lg  hover:bg-(--rich-brown) hover:text-(--white) "/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
  