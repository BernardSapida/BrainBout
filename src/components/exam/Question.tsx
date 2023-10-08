import { Button } from '@nextui-org/react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Identification from './Identification';
import Enumeration from './Enumeration';

interface QuestionProps {
    questionNumber: number;
    questions: Questions;
    answers: { answer: string }[];
    setAnswers: Dispatch<SetStateAction<{
        answer: string;
    }[]>>;
    examTimeout: boolean;
    nextQuestion: () => void;
    prevQuestion: () => void;
    handleSubmit: () => void;
    redirectToLeaderboard: () => void;
}

const Question: FunctionComponent<QuestionProps> = ({
    questionNumber,
    questions,
    answers,
    setAnswers,
    examTimeout,
    nextQuestion,
    prevQuestion,
    handleSubmit,
}) => {
    return (
        <div className='p-5'>
            <p className='text-tiny text-default-500'>Question: {questionNumber}/{questions.length}</p>
            {
                questions[questionNumber - 1].type === 'identification' && (
                    <Identification
                        questionNumber={questionNumber}
                        question={questions[questionNumber - 1]}
                        answer={answers[questionNumber - 1].answer!}
                        setAnswers={setAnswers}
                        submitted={examTimeout}
                    />
                )
            }
            {
                questions[questionNumber - 1].type === 'enumeration' && (
                    <Enumeration
                        questionNumber={questionNumber}
                        question={questions[questionNumber - 1]}
                        answer={answers[questionNumber - 1].answer!}
                        setAnswers={setAnswers}
                        submitted={examTimeout}
                    />
                )
            }
            {
                !examTimeout && (
                    <div className='flex justify-between my-5'>
                        {
                            questionNumber > 1 && (
                                <Button
                                    variant='bordered'
                                    color='default'
                                    onClick={prevQuestion}
                                >
                                    Previous question
                                </Button>
                            )
                        }
                        {
                            questionNumber < questions.length && (
                                <Button
                                    variant='shadow'
                                    color='primary'
                                    className='block ml-auto'
                                    onClick={nextQuestion}
                                >
                                    Next question
                                </Button>
                            )
                        }
                        {
                            questionNumber == questions.length && (
                                <Button
                                    variant='shadow'
                                    color='primary'
                                    className='block ml-auto'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            )
                        }
                    </div>
                )
            }

        </div>
    );
}

export default Question;