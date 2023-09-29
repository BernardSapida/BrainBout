'use client'

import { FunctionComponent } from 'react';

import { Input, Select, SelectItem, Button } from '@nextui-org/react';

import styles from '@/tw-styles/home/form';

interface FormProps { }

const Form: FunctionComponent<FormProps> = () => {
    const subjects: Subject[] = [
        {
            name: 'CS ELECTIVE 1',
            subjectCode: 'COSC 101'
        },
        {
            name: 'SOFTWARE ENGINEERING II',
            subjectCode: 'COSC 75A'
        },
        {
            name: 'Operating Systems',
            subjectCode: 'COSC 80B'
        },
        {
            name: 'NETWORKS AND COMMUNICATION',
            subjectCode: 'COSC 85B'
        },
        {
            name: 'APPLICATION DEVELOPMENT AND EMERGING TECHNOLOGIES',
            subjectCode: 'DCIT 26'
        },
        {
            name: 'SOCIAL AND PROFESSIONAL ISSUES',
            subjectCode: 'DCIT 65A'
        },
    ];

    return (
        <div className={styles.container}>
            <Select
                label="Select subject"
                placeholder="Select an animal"
                // className={styles.select}
                name='subject'
                size='sm'
            >
                {subjects.map((subject) => (
                    <SelectItem
                        key={subject.subjectCode}
                        value={subject.subjectCode}
                        textValue={`${subject.subjectCode} - ${subject.name}`}
                    >
                        {subject.subjectCode} - {subject.name}
                    </SelectItem>
                ))}
            </Select>
            <Button color="primary">
                View leaderboard
            </Button>
        </div>
    );
}

export default Form;