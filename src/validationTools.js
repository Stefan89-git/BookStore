import * as yup from 'yup';
import { DateTime } from 'luxon';


export const bookYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    title: yup.string().ensure().required("Provide book headline"),
    authors: yup.array().ensure().required("Provide book author"),
    publishDate: yup.date().max(DateTime.now(),"Latest date is today's"),
    rating: yup.number().min(1).max(5).required("Enter  the ratings"),
    genre: yup.string().ensure().required("Provide genre"),
    isbn: yup.string().length(13).ensure().required("Please enter ISBN"),
    available: yup.boolean().required("Provide info if book is available"),
    pages: yup.number().integer().nullable(false).required("Provide page number")
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}