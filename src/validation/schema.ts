import * as Yup from 'yup';

export const FormSchema = Yup.object({
    subject: Yup.string().matches(/^(COSC 101|COSC 75A|COSC 80B|COSC 85B|DCIT 26|DCIT 65A)$/, 'Please choose a subject').required('Subject is required.'),
    lecture: Yup.string().required('Lecture is required.'),
});