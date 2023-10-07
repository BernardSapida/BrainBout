import { Button, Divider } from '@nextui-org/react';
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
    redirectToLeaderboard
}) => {
    return (
        <div className='m-5'>
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
            <Divider />
            <div className='flex justify-between mt-5'>
                {
                    !examTimeout && questionNumber > 1 && (
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
                    !examTimeout && questionNumber < questions.length && (
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
                    questionNumber == questions.length && !examTimeout && (
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
                {
                    questionNumber == questions.length && examTimeout && (
                        <Button
                            variant='shadow'
                            color='primary'
                            className='block ml-auto'
                            onClick={redirectToLeaderboard}
                        >
                            Go to leaderboard
                        </Button>
                    )
                }
            </div>
        </div>
    );
}

export default Question;