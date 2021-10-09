export interface Product {
    _id: string;
    name: name;
    imgs: imgs;
    description: description;
    category: string;
    price: number;
    notes: [];
    instructions: [];
    
}

type name = {
    HEB: string;
    EN: string;
};

type imgs = {
    producImgUrl: string;
    labelImgUrl: string;
};

type description = {
    descPreview: string;
    descDetails: descDetails[];
};
type descDetails = {
    paragraph: string;
    fontWeightBold: boolean;
    isParagraphTitle: boolean;
};