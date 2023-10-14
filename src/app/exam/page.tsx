'use client';

import Wrapper from '@/components/Wrapper';
import Question from '@/components/exam/Question';
import { getExam, updateExamScore } from '@/lib/data';
import { progressBarColor, secondsToMinutesAndSeconds, timeProgress } from '@/lib/utils';
import { Button, Chip, Divider, Progress, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const [questions, setQuestions] = useState<Questions>([]);
    const [answers, setAnswers] = useState<{ answer: string }[]>([]);
    const [time, setTime] = useState<number>(-1);
    const [questionNumber, setQuestionNumber] = useState<number>(1);
    const [examTimeout, setExamTimeout] = useState<boolean>(false);
    const score = useRef<number>(0);
    const overallScore = useRef<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const DEFAULT_TIME_FOR_QUESTION = 30;
    const subject = searchParams.get('subject');
    const lecture = searchParams.get('lecture');

    const redirectToLeaderboard = () => {
        router.push(`/leaderboard?subject=${subject}`);
    }

    const calculateScore = () => {
        for (let i = 0; i < questions.length; i++) {
            const { type: questionType, answer: questionAnswer, answers: questionAnswers } = questions[i];
            const { answer } = answers[i];

            if (questionType === 'enumeration') {
                if (questionAnswers) {
                    answer.split(', ').forEach((answer: string) => {
                        if (questionAnswers?.includes(answer.toLowerCase())) {
                            score.current++;
                        }
                    });

                    overallScore.current += questionAnswers?.length;
                    continue;
                }
            }

            if (questionAnswer == answer.toLowerCase()) score.current++;
            overallScore.current++;
        }
    }

    const handleSubmit = () => {
        if (!examTimeout) setExamTimeout(true);

        console.log('Submitted!')

        calculateScore();

        // Update user score for this exam
        if (subject && lecture) {
            updateExamScore(subject, lecture, score.current);
        }
    }

    const nextQuestion = () => {
        if (questionNumber < questions.length) {
            setQuestionNumber(questionNumber + 1);
        }
    }

    const prevQuestion = () => {
        if (questionNumber > 1) {
            setQuestionNumber(questionNumber - 1);
        }
    }

    const passedExam = () => {
        return (score.current / overallScore.current * 100) > 70;
    }

    useEffect(() => {
        if (subject && lecture) {
            getExam(subject, lecture).then((exam) => {
                const examQuestions = exam.questions.sort(() => 0.5 - Math.random());

                setQuestions(examQuestions);
                setTime(examQuestions.length * DEFAULT_TIME_FOR_QUESTION);
                setExamTimeout(false);
                setAnswers(() => {
                    let defaultAnswers = [];
                    for (let i = 0; i < examQuestions.length; i++) {
                        defaultAnswers.push({ answer: '' })
                    }
                    return defaultAnswers;
                });
            })
        } else {
            router.replace(`/exam?subject=${subject}&lecture=${lecture}`)
        }
    }, [subject]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (!examTimeout) {
            timer = setInterval(() => setTime((prevTime: number) => prevTime - 1), 1000);

            if (time == 0) {
                clearInterval(timer!)
                handleSubmit();
            }
        } else {
            clearInterval(timer!);
        }

        return () => clearInterval(timer!);
    }, [time, examTimeout]);

    if (questions.length === 0 || answers.length === 0) {
        return (
            <div className='w-full mt-24 flex justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <Spinner />
                    <h3 className='font-semibold text-xl text-center'>
                        Preparing your exam...
                    </h3>
                </div>
            </div>
        )
    }

    return (
        <Wrapper>
            <div className='max-w-md w-full mx-auto mt-10 rounded-lg bg-default-50 shadow-lg border-2 border-default-200'>
                <div className='p-5'>
                    <div className='flex justify-between'>
                        {!examTimeout && <p className='ml-auto'>Time: {secondsToMinutesAndSeconds(time)}</p>}
                        {examTimeout && <p>Score: {score.current}/{overallScore.current}</p>}
                        {examTimeout && <Chip color={passedExam() ? 'success' : 'danger'} variant="flat">{passedExam() ? 'Exam passed' : 'Exam failed'}</Chip>}
                    </div>
                    {
                        !examTimeout && (
                            <Progress
                                aria-label="Exam timer"
                                size="md"
                                value={timeProgress(questions.length * DEFAULT_TIME_FOR_QUESTION, time)}
                                color={progressBarColor(timeProgress(questions.length, time))}
                                className="max-w-md mt-3"
                            />
                        )
                    }
                </div>
                <Divider />
                {
                    examTimeout ?
                        (
                            questions.map((_, key) => (
                                <>
                                    <Question
                                        key={key}
                                        questionNumber={key + 1}
                                        questions={questions}
                                        answers={answers}
                                        setAnswers={setAnswers}
                                        examTimeout={examTimeout}
                                        redirectToLeaderboard={redirectToLeaderboard}
                                        nextQuestion={nextQuestion}
                                        prevQuestion={prevQuestion}
                                        handleSubmit={handleSubmit}
                                    />
                                    <Divider />
                                </>
                            ))
                        ) :
                        <Question
                            questionNumber={questionNumber}
                            questions={questions}
                            answers={answers}
                            setAnswers={setAnswers}
                            examTimeout={examTimeout}
                            redirectToLeaderboard={redirectToLeaderboard}
                            nextQuestion={nextQuestion}
                            prevQuestion={prevQuestion}
                            handleSubmit={handleSubmit}
                        />
                }
                {
                    questionNumber == questions.length && examTimeout && (
                        <Button
                            variant='shadow'
                            color='primary'
                            className='block ml-auto my-3 mr-3'
                            onClick={redirectToLeaderboard}
                        >
                            Go to leaderboard
                        </Button>
                    )
                }
            </div>
        </Wrapper>
    );
}

export default Page;
