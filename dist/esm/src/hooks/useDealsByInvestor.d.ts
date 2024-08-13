export declare const useDealsByInvestor: (investorName: string) => {
    company: {
        name: string | null;
        country: {
            name: string;
            isoCode: string;
            id?: number | undefined;
            createdAt?: string | Date | undefined;
            isAfricanCountry?: boolean | undefined;
        } | null;
        sectors: {
            sector: {
                name: string;
                id?: number | undefined;
                createdAt?: string | Date | undefined;
            };
        }[];
        about: string | null;
        launchYear: string | null;
        femaleFounder: boolean | null;
        diverseFounders: boolean | null;
        id?: number | undefined;
        logo?: {
            cloudinaryPublicId: string;
            url: string;
            format: string;
            originalFilename: string;
            id?: number | undefined;
            createdAt?: string | Date | undefined;
        } | null | undefined;
        createdAt?: string | Date | undefined;
        website?: string | null | undefined;
        logoId?: number | null | undefined;
    };
    stage: string;
    pressRelease: {
        date: string | Date | null;
        title: string;
        link: string | null;
        id?: number | undefined;
        createdAt?: string | Date | undefined;
        companyId?: number | null | undefined;
    };
    investors: {
        investor: {
            name: string;
            id?: number | undefined;
            logo?: {
                cloudinaryPublicId: string;
                url: string;
                format: string;
                originalFilename: string;
                id?: number | undefined;
                createdAt?: string | Date | undefined;
            } | null | undefined;
            createdAt?: string | Date | undefined;
            website?: string | null | undefined;
            logoId?: number | null | undefined;
        };
    }[];
    amount: number;
    id?: number | undefined;
    createdAt?: string | Date | undefined;
}[];
