import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Input } from '@nextui-org/react';

interface IdentificationProps {
    questionNumber: number;
    question: Question;
    answer: string;
    setAnswers: Dispatch<SetStateAction<any[]>>;
    submitted: boolean;
}

const Identification: FunctionComponent<IdentificationProps> =
    ({ questionNumber, question, answer, setAnswers, submitted }) => {
        return (
            <>
                <p>{question.question}</p>
                <div className='my-5'>
                    <Input
                        label='Answer'
                        value={answer}
                        onValueChange={
                            (value) =>
                                setAnswers(prevAnswers => prevAnswers.map((answer, index) => {
                                    console.log(index === questionNumber - 1)
                                    if (index === questionNumber - 1) answer.answer = value;
                                    return answer;
                                }))
                        }
                        isReadOnly={submitted}
                        variant='bordered'
                        color='default'
                    />
                    {
                        submitted && question.type === 'enumeration' &&
                        <p className='mt-3 text-tiny'><span className='text-green-300'>Correct answer:</span> {Object.keys(question.answers!).join(', ')}</p>
                    }
                    {
                        submitted && question.type === 'identification' &&
                        <p className='mt-3 text-tiny'><span className='text-green-300'>Correct answer:</span> {question.answer}</p>
                    }
                </div>
            </>
        );
    }

export default Identification;