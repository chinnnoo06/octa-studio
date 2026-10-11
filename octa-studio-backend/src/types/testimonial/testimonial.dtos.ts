import { TAdminListQuery } from "../common/common.dtos";

export type TTestimonialDto = {
    quote: string,
    name: string,
    rating: number
}

export type TGetAdminTestimonialsQuery = TAdminListQuery & {
    rating?: string
}
