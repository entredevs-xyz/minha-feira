import { FairModel } from "@/data/fair/model";
import { orderBy } from "lodash";


export const dateToLocaleString = (date: Date) => {
    return date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
}

export const getFairsPriceByMoths = (fairs: FairModel[]) => {

    const fairsAndMonth = orderBy(fairs, "createdAt").map(fair => ({
        month: dateToLocaleString(new Date(fair.createdAt)),
        price: fair.fairList?.reduce((acc, item) => acc + item.price, 0) ?? 0
    }))
    return fairsAndMonth;
}