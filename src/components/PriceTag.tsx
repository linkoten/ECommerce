import { formatPrice } from "@/lib/format";
import { Badge } from "./ui/badge";

interface PriceTagProps {
  price: number;
}

export default function PriceTag({ price }: PriceTagProps) {
  return <Badge >{formatPrice(price)}</Badge>;
}