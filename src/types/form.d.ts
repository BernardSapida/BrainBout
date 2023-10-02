type SubjectCode = 'COSC 101' | 'COSC 75A' | 'COSC 80B' | 'COSC 85B' | 'DCIT 26' | 'DCIT 65A' | '';

type FormError = {
    subject: string;
}

type Questions = Question[];

type Question = {
    type: string;
    question: string;
    choices?: {
        letter: 'A' | 'B' | 'C' | 'D';
        description: string;
    }[];
    answer?: 'A' | 'B' | 'C' | 'D' | string;
    answers?: string[];
};