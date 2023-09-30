'use client';

import Wrapper from '@/components/Wrapper';
import { progressBarColor, secondsToMinutesAndSeconds, timeProgress } from '@/lib/utils';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Divider, Progress, Button, Chip } from "@nextui-org/react";
import MultipleChoice from '@/components/exam/MultipleChoice';
import Identification from '@/components/exam/Identification';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateExamScore } from '@/lib/data';

interface PageProps { }

const Page: FunctionComponent<PageProps> = () => {
    const [questions, setQuestions] = useState<Questions>([
        {
            type: 'multiple-choice',
            question: 'Set of instructions that tells what the computer should do?',
            choices: [
                {
                    letter: 'A',
                    description: 'System Software'
                },
                {
                    letter: 'B',
                    description: 'Operating System'
                },
                {
                    letter: 'C',
                    description: 'Software'
                },
                {
                    letter: 'D',
                    description: 'Arithmetic Logic Unit'
                },
            ],
            answer: 'C',
        },
        {
            type: 'identification',
            question: 'It hides the ugly details of a computer operations.',
            answer: 'operating system',
        },
        {
            type: 'identification',
            question: 'With this, programmers can write programs without knowing the details.',
            answer: 'operating system',
        },
        {
            type: 'identification',
            question: 'It controls the execution of the program.',
            answer: 'operating system',
        },
        {
            type: 'identification',
            question: 'Set of instructions that tells what the computer should do.',
            answer: 'software',
        },
        {
            type: 'identification',
            question: 'It manipulates the basic operations (ex. input and output operations)',
            answer: 'system software',
        },
        {
            type: 'identification',
            question: 'It locates free disk space in a hard disk when files need it.',
            answer: 'system software',
        },
        {
            type: 'identification',
            question: 'User does not need to know these processes.',
            answer: 'system software',
        },
        {
            type: 'identification',
            question: 'It accoplishes the specialized tasks for users.',
            answer: 'application software',
        },
        {
            type: 'identification',
            question: 'It is an example of productivity tools, email, photographs, and processors.',
            answer: 'application software',
        },
        {
            type: 'identification',
            question: 'This is an example of word processing software, desktop, publishing software.',
            answer: 'document production software',
        },
        {
            type: 'identification',
            question: 'It creates and manipulates spreadsheet electronically.',
            answer: 'spreadsheet software',
        },
        {
            type: 'identification',
            question: 'It creates and display information in the form of slideshow.',
            answer: 'presentation software',
        },
        {
            type: 'identification',
            question: 'It is used to store, modify, retrieve information from a storage.',
            answer: 'database management software',
        },
        {
            type: 'identification',
            question: 'It is used for business management.',
            answer: 'business software',
        },
        {
            type: 'identification',
            question: 'It is used to manipulate picture, sound, and video.',
            answer: 'multimedia software',
        },
        {
            type: 'identification',
            question: 'It is used for music players, video players, and games.',
            answer: 'entertainment software',
        },
        {
            type: 'enumeration',
            question: 'Enumerate 2 classes of software (2pts).',
            answers: {
                'system software': true,
                'application software': true,
            },
        },
        {
            type: 'enumeration',
            question: 'Enumerate 6 example of operating system (6pts).',
            answers: {
                'window os': true,
                'mac os': true,
                'linux': true,
                'ios': true,
                'android': true,
                'symbian': true,
            },
        },
        {
            type: 'enumeration',
            question: 'Enumerate 5 example of system software (5pts).',
            answers: {
                'os': true,
                'interpreters': true,
                'compilers': true,
                'debugger': true,
                'text editor': true,
            },
        },
        {
            type: 'enumeration',
            question: 'Enumerate 4 components of a computer system (4pts).',
            answers: {
                'user': true,
                'application software': true,
                'operating system': true,
                'hardware': true,
            },
        },
        {
            type: 'enumeration',
            question: 'Enumerate 7 categories of a application software (7pts).',
            answers: {
                'document production software': true,
                'spreadsheet software': true,
                'presentation software': true,
                'database management software': true,
                'business software': true,
                'multimedia software': true,
                'entertainment software': true,
            },
        },
    ]);
    const [answers, setAnswers] = useState<any[]>([
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
        { answer: '' },
    ]);
    const [time, setTime] = useState<number>(questions.length * 10);
    const [questionNumber, setQuestionNumber] = useState<number>(1);
    const [examTimeout, setExamTimeout] = useState<boolean>(false);
    const score = useRef<number>(0);
    const overallScore = useRef<number>(0);
    const router = useRouter();
    const searchParams = useSearchParams();

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

    const handleSubmit = async () => {
        const subject = searchParams.get('subject');

        if (!examTimeout) setExamTimeout(true);

        calculateScore();

        // Update user score for this exam
        if (subject) {
            updateExamScore(subject, score.current);
        }
    }

    const redirectToDashboard = () => {
        router.push('/dashboard');
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
                                answer={answers[questionNumber - 1].answer}
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
                                answer={answers[questionNumber - 1].answer}
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
                                    onClick={redirectToDashboard}
                                >
                                    Go to dashboard
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