'use client'

import { FunctionComponent, useRef, useState } from 'react';

import { Select, SelectItem, Button } from '@nextui-org/react';

import { FormSchema } from '@/validation/schema';

import styles from '@/tw-styles/home/form';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';

interface FormProps { }

const Form: FunctionComponent<FormProps> = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const subjects: Subject[] = [
        {
            name: 'Choose a subject',
            subjectCode: '',
            lectures: []
        },
        {
            name: 'CS ELECTIVE 1',
            subjectCode: 'COSC 101',
            lectures: ["Cover-to-cover", "1"]
        },
        // {
        //     name: 'SOFTWARE ENGINEERING II',
        //     subjectCode: 'COSC 75A'
        // },
        {
            name: 'OPERATING SYSTEM',
            subjectCode: 'COSC 80B',
            lectures: ["Cover-to-cover", "1", "2"]
        },
        // {
        //     name: 'NETWORKS AND COMMUNICATION',
        //     subjectCode: 'COSC 85B'
        // },
        {
            name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
            subjectCode: 'DCIT 26',
            lectures: ["Cover-to-cover", "1", "2"]
        },
        // {
        //     name: 'SOCIAL AND PROFESSIONAL ISSUES',
        //     subjectCode: 'DCIT 65A'
        // },
    ];
    const router = useRouter();

    const getSubjectIndex = (subjectCode: string) => {
        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].subjectCode == subjectCode) return i;
        }

        return -1;
    }

    const handleSubmit = async (
        values: { subject: SubjectCode, lecture: string },
        { resetForm }: { resetForm: any }
    ) => {
        try {
            setLoading(true);
            setIsSubmitted(false);

            let subject = values.subject.replace(' ', '').toLowerCase();
            let lecture = values.lecture;

            router.push(`/exam?subject=${subject}&lecture=${lecture}`)

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.response.data.message;
            console.log(errorMessage);
        }
    };

    return (
        <Formik
            initialValues={{ subject: '', lecture: '' }}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, handleSubmit, handleChange, values }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <Select
                            label='Subject'
                            variant='bordered'
                            name='subject'
                            size='lg'
                            color={!isSubmitted ? 'default' : (errors.subject ? 'danger' : 'success')}
                            isInvalid={errors.subject != undefined}
                            errorMessage={errors.subject}
                            onChange={handleChange}
                            selectedKeys={[values.subject]}
                            isDisabled={loading}
                        >
                            {subjects.map((subject) => (
                                <SelectItem
                                    key={subject.subjectCode}
                                    value={subject.subjectCode}
                                    textValue={`${subject.subjectCode} ${subject.subjectCode && '-'} ${subject.name}`}
                                >
                                    {subject.subjectCode != '' ? `${subject.subjectCode} - ${subject.name}` : subject.name}
                                </SelectItem>
                            ))}
                        </Select>
                        {
                            values.subject && (
                                <Select
                                    label='Lecture'
                                    variant='bordered'
                                    name='lecture'
                                    size='lg'
                                    color={!isSubmitted ? 'default' : (errors.lecture ? 'danger' : 'success')}
                                    isInvalid={errors.lecture != undefined}
                                    errorMessage={errors.lecture}
                                    onChange={handleChange}
                                    isDisabled={loading}
                                >
                                    {subjects[getSubjectIndex(values.subject)].lectures.map((lecture) => (
                                        <SelectItem
                                            key={lecture}
                                            value={lecture}
                                            textValue={lecture}
                                        >
                                            {lecture}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )
                        }
                        <Button
                            type='submit'
                            color='primary'
                            onClick={() => setIsSubmitted(true)}
                            isLoading={loading}
                        >
                            {
                                loading ?
                                    'Starting...' :
                                    'Start exam'
                            }
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default Form;