import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import { Chip, Input } from '@nextui-org/react';

interface IdentificationProps {
    questionNumber: number;
    question: Question;
    answer: string;
    setAnswers: Dispatch<SetStateAction<any[]>>;
    submitted: boolean;
}

const Identification: FunctionComponent<IdentificationProps> =
    ({ questionNumber, question, answer, setAnswers, submitted }) => {
        const getInputColor = () => {
            return submitted ?
                (
                    answer === question.answer ?
                        'success' : 'danger'
                ) :
                'default';
        }

        const displayResult = () => {
            return submitted ?
                (
                    answer === question.answer ?
                        <></> :
                        <p className='mt-3 text-tiny'><span className='text-green-300'>Answer:</span> {question.answer}</p>
                ) :
                <></>;
        }

        const renderChip = () => {
            return submitted ?
                (
                    answer === question.answer ?
                        <Chip startContent={<AiFillCheckCircle />} color="success" size='sm' variant='faded'><small>Correct</small></Chip> :
                        <Chip startContent={<AiFillCloseCircle />} color="danger" size='sm' variant='faded'><small>Wrong</small></Chip>
                ) :
                <></>;
        }

        return (
            <>
                <p>{question.question}</p>
                <div className='my-5'>
                    <Input
                        endContent={renderChip()}
                        label='Answer'
                        value={answer}
                        onValueChange={
                            (value) =>
                                setAnswers(prevAnswers => prevAnswers.map((answer, index) => {
                                    if (index === questionNumber - 1) answer.answer = value;
                                    return answer;
                                }))
                        }
                        disabled={submitted}
                        variant='bordered'
                        color={getInputColor()}
                    />
                    {submitted && displayResult()}
                </div>
            </>
        );
    }

export default Identification;