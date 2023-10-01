'use client';

import Wrapper from '@/components/Wrapper';
import Identification from '@/components/exam/Identification';
import MultipleChoice from '@/components/exam/MultipleChoice';
import { getExam, updateExamScore } from '@/lib/data';
import { progressBarColor, secondsToMinutesAndSeconds, timeProgress } from '@/lib/utils';
import { Button, Chip, Divider, Progress, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const [questions, setQuestions] = useState<Questions>([]);
    const [answers, setAnswers] = useState<{ answer: string }[]>([]);
    const [time, setTime] = useState<number>(0);
    const [questionNumber, setQuestionNumber] = useState<number>(1);
    const [examTimeout, setExamTimeout] = useState<boolean>(false);
    const score = useRef<number>(0);
    const overallScore = useRef<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const subject = searchParams.get('subject');

    const redirectToLeaderboard = () => {
        router.push(`/leaderboard?subject=${subject}`);
    }

    const calculateScore = () => {
        for (let i = 0; i < questions.length; i++) {
            const { type: questionType, answer: questionAnswer, answers: questionAnswers } = questions[i];
            const { answer } = answers[i];

            if (questionType === 'enumeration') {
                let enumerationAnswers = questionAnswers!;

                answer.split(', ').forEach((answer: string) => {
                    if (enumerationAnswers[answer]) {
                        delete enumerationAnswers[answer];
                        score.current++;
                    }

                });

                overallScore.current += Object.keys(enumerationAnswers).length;
                continue;
            }

            if (questionAnswer == answer) score.current++;
            overallScore.current++;
        }
    }

    const handleSubmit = () => {
        if (!examTimeout) setExamTimeout(true);

        calculateScore();

        // Update user score for this exam
        if (subject) {
            updateExamScore(subject, score.current);
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
        if (subject) {
            getExam(subject).then((exam) => {
                const examQuestions = exam.data.questions.sort(() => 0.5 - Math.random());

                setQuestions(examQuestions);
                setTime(examQuestions.length * 10);
                setExamTimeout(false);
                setAnswers(() => {
                    let defaultAnswers = [];
                    for (let i = 0; i < examQuestions.length; i++) {
                        defaultAnswers.push({ answer: '' })
                    }
                    return defaultAnswers;
                });
            })
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
                        {!examTimeout && <p className='mr-auto'>Time: {secondsToMinutesAndSeconds(time)}</p>}
                        {!examTimeout && <p>Question: {questionNumber}/{questions.length}</p>}
                        {examTimeout && <Chip color={passedExam() ? 'success' : 'danger'} variant="flat">{passedExam() ? 'Exam passed' : 'Exam failed'}</Chip>}
                        {examTimeout && <p>Score: {score.current}/{overallScore.current}</p>}
                    </div>
                    {
                        !examTimeout && (
                            <Progress
                                aria-label="Exam timer"
                                size="md"
                                value={timeProgress(questions.length * 10, time)}
                                color={progressBarColor(timeProgress(questions.length, time))}
                                className="max-w-md mt-3"
                            />
                        )
                    }
                </div>
                <Divider />
                <div className='p-5'>
                    {
                        questions[questionNumber - 1].type === 'multiple-choice' && (
                            <MultipleChoice
                                questionNumber={questionNumber}
                                question={questions[questionNumber - 1]}
                                answer={answers[questionNumber - 1].answer!}
                                setAnswers={setAnswers}
                                submitted={examTimeout}
                            />
                        )
                    }
                    {
                        questions[questionNumber - 1].type !== 'multiple-choice' && (
                            <Identification
                                questionNumber={questionNumber}
                                question={questions[questionNumber - 1]}
                                answer={answers[questionNumber - 1].answer!}
                                setAnswers={setAnswers}
                                submitted={examTimeout}
                            />
                        )
                    }
                    <div className='flex justify-between'>
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
            </div>
        </Wrapper>
    );
}

export default Page;