"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Download } from 'lucide-react';
import JobApplicationModal from '@/components/job/JobApplicationModal';
import JobFilters, { FilterState } from '@/components/job/JobFilters';
import JobApplicationsTable from '@/components/job/JobApplicationsTable';
import { jobsApi } from '@/lib/api';
import { Job } from '@/types/types';

import { Button } from '@/components/ui/button';
import { exportJobsToCSV } from '@/components/common/helper';

const ApplicationPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        status: 'all',
        jobType: 'all',
        locationType: 'all',
    });

    const fetchJobs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await jobsApi.getJobs({
                search: filters.search || undefined,
                status: filters.status !== 'all' ? filters.status : undefined,
                jobType: filters.jobType !== 'all' ? filters.jobType : undefined,
                locationType: filters.locationType !== 'all' ? filters.locationType : undefined,
            });
            setJobs(response.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const handleJobCreated = () => {
        fetchJobs();
    };

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            jobType: 'all',
            locationType: 'all',
        });
    };

    const handleExportCSV = () => {
        exportJobsToCSV(jobs);
    };

    return (
        <div className="container mx-auto px-6 py-8 max-h-screen">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-lg md:text-3xl font-bold text-gray-900">Job Applications</h1>
                    <div className="flex items-center space-x-3">
                        {jobs.length > 0 && (
                            <Button
                                onClick={handleExportCSV}
                                disabled={isLoading || jobs.length === 0}
                                variant="outline"
                                className="flex items-center space-x-2"
                            >
                                <Download className="w-4 h-4" />
                            </Button>
                        )}
                        <JobApplicationModal onJobCreated={handleJobCreated} />
                    </div>
                </div>
                <div className="mb-6">
                    <JobFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>
                <JobApplicationsTable
                    jobs={jobs}
                    isLoading={isLoading}
                    onJobUpdated={handleJobCreated}
                />

            </div>
        </div>
    );
};

export default ApplicationPage;