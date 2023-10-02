import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Textarea } from '@nextui-org/react';

interface EnumerationProps {
    questionNumber: number;
    question: Question;
    answer: string;
    setAnswers: Dispatch<SetStateAction<any[]>>;
    submitted: boolean;
}

const Enumeration: FunctionComponent<EnumerationProps> =
    ({ questionNumber, question, answer, setAnswers, submitted }) => {
        return (
            <>
                <p>{question.question}</p>
                <div className='my-5'>
                    <Textarea
                        label='Answer'
                        value={answer}
                        onValueChange={
                            (value) =>
                                setAnswers(prevAnswers => prevAnswers.map((answer, index) => {
                                    if (index === questionNumber - 1) answer.answer = value;
                                    return answer;
                                }))
                        }
                        isReadOnly={submitted}
                        variant='bordered'
                        color='default'
                    />
                    {
                        submitted &&
                        <p className='mt-3 text-tiny'><span className='text-green-300'>Correct answer:</span> {question.answers?.join(', ')}</p>
                    }
                </div>
            </>
        );
    }

export default Enumeration;