import { FairModel } from "@/data/fair/model";
import { groupBy, orderBy } from "lodash";


export const dateToLocaleString = (date: Date) => {
    return date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
}

export const getFairsPriceByMoths = (fairs: FairModel[]) => {
    
    const fairsAndMonth = orderBy(fairs, "createdAt").map(fair => ({
        month: dateToLocaleString(new Date(fair.date)),
        price: fair.fairList?.reduce((acc, item) => acc + item.price, 0) ?? 0
    }))

    const groupByMonth = groupBy(fairsAndMonth, "month");
    const summarizedFairsAndMonth: {
        month: string;
        price: number;
    }[] = [];

    Object.keys(groupByMonth).forEach(month => {
        const price = groupByMonth[month].reduce((acc, item) => acc + item.price, 0);
        summarizedFairsAndMonth.push({
            month,
            price
        })
    })

    return summarizedFairsAndMonth;
}