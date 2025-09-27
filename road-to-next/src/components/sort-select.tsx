"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select,SelectTrigger,SelectContent,SelectItem,SelectValue } from "./ui/select";

type Option ={
  label: string;
  value: string
}
type SearchInputProps={
  defaultValue: string;
  options: Option []
}
const SortSelect = ({defaultValue,options}:SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace}= useRouter();
  
  
  
  const handlerSort =  (value: string) => {
    
    const params = new URLSearchParams(searchParams);
    if (value === defaultValue){
      params.delete("sort");
    } else if (value){
      params.set("sort",value);
  } else {
    params.delete("sort");
  }
  replace(`${pathname}?${params.toString()}`, {scroll:false,});
  };

  return <Select defaultValue={searchParams.get("sort")?.toString() || defaultValue} onValueChange={handlerSort}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {options.map((option)=>(
      <SelectItem key={option.value} value={option.value}>
        {option.label}
        </SelectItem>))}
  </SelectContent>
</Select>;
}

export {SortSelect};