export default interface PrivacyPolicy {
    id: number;
    status: 'published' | 'draft' | 'archived';
    date_updated: string;
    date_created: string;
    excerpt: string | null;
    content: string | null;
}