import { Dispatch, FunctionComponent, SetStateAction } from 'react';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import { Chip, Radio, RadioGroup, cn } from '@nextui-org/react';

interface MultipleChoiceProps {
    questionNumber: number;
    question: Question;
    answer: string;
    setAnswers: Dispatch<SetStateAction<any[]>>;
    submitted: boolean;
}

export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-default-300",
                    `data-[selected=true]:border-primary`,
                )
            }}
        >
            {children}
        </Radio>
    );
};

const MultipleChoice: FunctionComponent<MultipleChoiceProps> =
    ({ questionNumber, question, answer, setAnswers, submitted }) => {
        return (
            <>
                <p>{question.question}</p>
                <div className='my-5'>
                    <RadioGroup
                        value={answer}
                        onValueChange={
                            (value) =>
                                setAnswers(prevAnswers => prevAnswers.map((answer, index) => {
                                    if (index === questionNumber - 1) answer.answer = value;
                                    return answer;
                                }))
                        }
                        isReadOnly={submitted}
                    >
                        {
                            question.choices?.map((choice, index) => (
                                <CustomRadio
                                    key={index}
                                    value={choice.letter}
                                >
                                    {choice.description}
                                    {choice.letter == answer && choice.letter != question.answer && submitted && <Chip className='ml-3' startContent={<AiFillCloseCircle />} color="danger" size='sm' variant='faded'><small>Wrong</small></Chip>}
                                    {choice.letter == question.answer && submitted && <Chip className='ml-3' startContent={<AiFillCheckCircle />} color="success" size='sm' variant='faded'><small>Correct</small></Chip>}
                                </CustomRadio>
                            ))
                        }

                    </RadioGroup>
                </div>
            </>
        );
    }

export default MultipleChoice;