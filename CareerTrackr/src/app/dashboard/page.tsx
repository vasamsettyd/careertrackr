"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Clock,
    Users,
    XCircle
} from 'lucide-react';
import AnimatedPieChart from '@/components/dashboard/AnimatedPieChart';
import AnimatedLineChart from '@/components/dashboard/AnimatedLineChart';
import RecentJobsTable from '@/components/dashboard/RecentJobsTable';
import { dashboardApi, DashboardData } from '@/lib/api';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [pieChartData, setPieChartData] = useState<DashboardData['statusData']>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartPeriod, setChartPeriod] = useState<'day' | 'week' | 'month'>('month');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [allJobs, setAllJobs] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const data = await dashboardApi.getDashboardData('month');
            setDashboardData(data);
            setPieChartData(data.statusData);

            const { jobsApi } = await import('@/lib/api');
            const jobsResponse = await jobsApi.getJobs();
            setAllJobs(jobsResponse.jobs || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFilteredTimelineData = () => {
        if (!allJobs.length) return [];

        const now = new Date();
        const intervals: { start: Date; end: Date; label: string }[] = [];

        if (chartPeriod === 'day') {
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                const start = new Date(date.setHours(0, 0, 0, 0));
                const end = new Date(date.setHours(23, 59, 59, 999));
                intervals.push({
                    start,
                    end,
                    label: start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                });
            }
        } else if (chartPeriod === 'week') {
            for (let i = 7; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - (i * 7));
                const start = new Date(date.setDate(date.getDate() - date.getDay()));
                start.setHours(0, 0, 0, 0);
                const end = new Date(start);
                end.setDate(end.getDate() + 6);
                end.setHours(23, 59, 59, 999);
                intervals.push({
                    start,
                    end,
                    label: `Week ${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                });
            }
        } else {
            for (let i = 5; i >= 0; i--) {
                const date = new Date(now);
                date.setMonth(date.getMonth() - i);
                const start = new Date(date.getFullYear(), date.getMonth(), 1);
                const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
                intervals.push({
                    start,
                    end,
                    label: start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                });
            }
        }

        return intervals.map(interval => {
            const count = allJobs.filter(job => {
                const jobDate = new Date(job.createdAt);
                return jobDate >= interval.start && jobDate <= interval.end;
            }).length;

            return {
                name: interval.label,
                jobs: count,
                date: interval.start.toISOString()
            };
        });
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        const handleClearFilter = () => {
            setSelectedStatus(null);
        };

        window.addEventListener('clearFilter', handleClearFilter);
        return () => window.removeEventListener('clearFilter', handleClearFilter);
    }, []);

    const handlePeriodChange = (period: 'day' | 'week' | 'month') => {
        setChartPeriod(period);
    };

    const handlePieChartClick = (status: string) => {
        setSelectedStatus(selectedStatus === status ? null : status);
    };

    const getFilteredJobs = () => {
        if (!selectedStatus) return allJobs;
        return allJobs.filter(job => job.status === selectedStatus);
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Dashboard</h1>
                <p className="text-gray-600">Track your job search progress and analytics</p>
            </div>

            {isLoading || !dashboardData && (<>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg border animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg border animate-puls w-full md:w-1/2 h-50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </>)}

            {dashboardData && (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-600">Applied</p>
                                    <p className="text-2xl font-bold text-blue-700">{dashboardData.stats.applied}</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-yellow-600">Interview</p>
                                    <p className="text-2xl font-bold text-yellow-700">{dashboardData.stats.interview}</p>
                                </div>
                                <Clock className="w-8 h-8 text-yellow-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-50 p-4 rounded-lg border border-green-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-600">Offers</p>
                                    <p className="text-2xl font-bold text-green-700">{dashboardData.stats.offer}</p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-50 p-4 rounded-lg border border-red-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-red-600">Rejected</p>
                                    <p className="text-2xl font-bold text-red-700">{dashboardData.stats.rejected}</p>
                                </div>
                                <XCircle className="w-8 h-8 text-red-500" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pieChartData.length > 0 && (
                            <AnimatedPieChart
                                data={pieChartData}
                                title="Application Status Distribution"
                                delay={0.5}
                                onSegmentClick={handlePieChartClick}
                                selectedStatus={selectedStatus}
                            />
                        )}
                        {getFilteredTimelineData().length > 0 && (
                            <AnimatedLineChart
                                data={getFilteredTimelineData()}
                                title="Job Applications Over Time"
                                onPeriodChange={handlePeriodChange}
                                currentPeriod={chartPeriod}
                                isLoading={false}
                                delay={0.1}
                            />
                        )}
                    </div>

                    <RecentJobsTable
                        jobs={getFilteredJobs()}
                        isLoading={isLoading}
                        delay={0.9}
                        selectedStatus={selectedStatus}
                    />
                </>
            )}
        </div>
    );
};

export default Dashboard;