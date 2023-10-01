'use client'

import { FunctionComponent, useState } from 'react';

import { Select, SelectItem, Button } from '@nextui-org/react';

import { FormSchema } from '@/validation/schema';

import styles from '@/tw-styles/home/form';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';

interface FormProps { }

const Form: FunctionComponent<FormProps> = () => {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const subjects: Subject[] = [
        {
            name: 'Choose a subject',
            subjectCode: ''
        },
        // {
        //     name: 'CS ELECTIVE 1',
        //     subjectCode: 'COSC 101'
        // },
        // {
        //     name: 'SOFTWARE ENGINEERING II',
        //     subjectCode: 'COSC 75A'
        // },
        {
            name: 'Operating Systems',
            subjectCode: 'COSC 80B'
        },
        // {
        //     name: 'NETWORKS AND COMMUNICATION',
        //     subjectCode: 'COSC 85B'
        // },
        // {
        //     name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
        //     subjectCode: 'DCIT 26'
        // },
        // {
        //     name: 'SOCIAL AND PROFESSIONAL ISSUES',
        //     subjectCode: 'DCIT 65A'
        // },
    ];

    const handleSubmit = async (
        values: { subject: SubjectCode },
        { resetForm }: { resetForm: any }
    ) => {
        try {
            setLoading(true);
            setIsSubmitted(false);

            let subject = values.subject.replace(' ', '').toLowerCase();

            router.push(`/leaderboard?subject=${subject}`)

            resetForm();
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            const errorMessage = error.response.data.message;
            console.log(errorMessage);
        }
    };

    return (
        <Formik
            initialValues={{ subject: '' }}
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
                            size='sm'
                            color={!isSubmitted ? 'default' : (errors.subject ? 'danger' : 'success')}
                            isInvalid={errors.subject != undefined}
                            errorMessage={errors.subject}
                            onChange={handleChange}
                            selectedKeys={[values.subject]}
                            disabled={loading}
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
                        <Button
                            type='submit'
                            color='primary'
                            onClick={() => setIsSubmitted(true)}
                        >
                            View leaderboard
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default Form;