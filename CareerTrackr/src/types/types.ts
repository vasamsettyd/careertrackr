export interface Job {
    id: string;
    companyName: string;
    jobTitle: string;
    role: string;
    address?: string;
    locationType?: 'remote' | 'on_site' | 'hybrid';
    appliedDate: string;
    status: 'applied' | 'interview' | 'offer' | 'rejected' | 'saved' | 'closed';
    notes?: string;
    jobType: 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary' | 'volunteer' | 'other';
    salary?: number;
    jobUrl?: string;
    createdAt: string;
    tags?: Array<{
        tag: {
            id: string;
            name: string;
        };
    }>;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    userImageUrl?: string;
    userImagePublicId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LineChartData {
    name: string;
    jobs: number;
    date: string;
    [key: string]: string | number;
}

export interface PieChartData {
    name: string;
    value: number;
    status: string;
    [key: string]: string | number;
}

export interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
    onClick?: () => void;
}

export interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

export interface AnimatedLineChartProps {
    data: LineChartData[];
    title: string;
    onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
    currentPeriod?: 'day' | 'week' | 'month';
    isLoading?: boolean;
    delay?: number;
}

export interface AnimatedPieChartProps {
    data: PieChartData[];
    title: string;
    delay?: number;
    onSegmentClick?: (status: string) => void;
    selectedStatus?: string | null;
}

export interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor?: string;
    delay?: number;
}

export interface RecentJobsTableProps {
    jobs: Job[];
    isLoading: boolean;
    delay?: number;
    selectedStatus?: string | null;
}

export interface JobApplicationsTableProps {
    jobs: Job[];
    isLoading: boolean;
    onJobUpdated?: () => void;
}

export interface JobDetailsModalProps {
    job: Job;
    onClose: () => void;
    onJobUpdated: () => void;
}

export interface JobEditModalProps {
    job: Job;
    onClose: () => void;
    onJobUpdated: () => void;
}

export interface JobApplicationModalProps {
    onJobCreated: () => void;
    editJob?: Job;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface JobFiltersProps {
    onFiltersChange: (filters: {
        status?: string;
        jobType?: string;
        locationType?: string;
        search?: string;
    }) => void;
    currentFilters: {
        status?: string;
        jobType?: string;
        locationType?: string;
        search?: string;
    };
}

export interface DatePickerProps {
    selected?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
}

export interface UserDetailsProps {
    className?: string;
    open: boolean;
}

export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'saved' | 'closed';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'temporary' | 'volunteer' | 'other';
export type LocationType = 'remote' | 'on_site' | 'hybrid';
export type ChartPeriod = 'day' | 'week' | 'month';
