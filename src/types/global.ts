type Subjects = Subject[]

type Subject = {
    name: string;
    subjectCode: string;
}

type Menus = Menu[]

type Menu = {
    name: string;
    pathname: string;
    isActive: () => boolean;
}