import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { Chip, Textarea } from '@nextui-org/react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

interface EnumerationProps {
    questionNumber: number;
    question: Question;
    answer: string;
    setAnswers: Dispatch<SetStateAction<any[]>>;
    submitted: boolean;
}

const Enumeration: FunctionComponent<EnumerationProps> =
    ({ questionNumber, question, answer, setAnswers, submitted }) => {
        const getInputColor = () => {
            const isCorrect = matchedToAnswers();

            return submitted ?
                (
                    isCorrect ?
                        'success' : 'danger'
                ) :
                'default';
        }

        const displayResult = () => {
            const isCorrect = matchedToAnswers();

            return submitted ?
                (
                    isCorrect ?
                        <></> :
                        <p className='mt-3 text-tiny'><span className='text-green-300'>Answer:</span> {question.answers?.join(', ')}</p>
                ) :
                <></>;
        }

        const matchedToAnswers = () => {
            const { answers: questionAnswer } = question;
            const userAnswer = answer.split(', ');

            if (questionAnswer?.length != userAnswer.length) return false;

            for (let a of questionAnswer) {
                if (!userAnswer?.includes(a.toLowerCase())) {
                    return false;
                }
            }

            return true;
        }

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
                        disabled={submitted}
                        variant='bordered'
                        color={getInputColor()}
                    />
                    {submitted && displayResult()}
                </div>
            </>
        );
    }

export default Enumeration;