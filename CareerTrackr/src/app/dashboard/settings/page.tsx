"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, User, Lock, Info } from 'lucide-react';
import { UserData } from '@/types/types';

const SettingsPage = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [profileForm, setProfileForm] = useState({
        name: '',
        phone: '',
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setProfileForm({
                        name: data.name || '',
                        phone: data.phone || '',
                    });
                } else {
                    setMessage({ type: 'error', text: 'Failed to load user data' });
                }
            } catch {
                setMessage({ type: 'error', text: 'Error loading user data' });
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.email) {
            fetchUserData();
        }
    }, [session]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profileForm.name,
                    phone: profileForm.phone,
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserData(updatedData);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                const error = await response.json();
                setMessage({ type: 'error', text: error.error || 'Failed to update profile' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Error updating profile' });
        } finally {
            setUpdating(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            setUpdating(false);
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
            setUpdating(false);
            return;
        }

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            });

            if (response.ok) {
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setMessage({ type: 'success', text: 'Password changed successfully!' });
            } else {
                const error = await response.json();
                setMessage({ type: 'error', text: error.error || 'Failed to change password' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Error changing password' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading || !userData) {
        return (
            <div className="container mx-auto py-6 px-4 max-w-6xl">
                <div className="space-y-6 mt-10">

                    <div className="space-y-6">
                        <div className="grid w-full grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-9 bg-gray-200 rounded animate-pulse"></div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-lg border animate-pulse">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="h-6 bg-gray-200 rounded w-48"></div>
                                    <div className="h-4 bg-gray-200 rounded w-80"></div>
                                </div>

                                <div className="flex items-center space-x-6 py-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-10 bg-gray-200 rounded w-32"></div>
                                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                                    </div>
                                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isOAuthUser = session?.user && 'image' in session.user && session.user.image && !userData.userImageUrl?.includes('localhost');

    return (
        <div className="container mx-auto py-6 px-4 max-w-6xl">
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>

                {message && (
                    <Alert className={message.type === 'error' ? 'border-red-500' : 'border-green-500'}>
                        <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                            {message.text}
                        </AlertDescription>
                    </Alert>
                )}

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile" className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span>Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="account" className="flex items-center space-x-2">
                            <Info className="h-4 w-4" />
                            <span>Account</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal information and profile picture.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={profileForm.name}
                                                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={profileForm.phone}
                                                onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userData.email}
                                            disabled
                                            className="bg-muted"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Email cannot be changed for security reasons.
                                        </p>
                                    </div>
                                    <Button className='bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)]' type="submit" disabled={updating}>
                                        {updating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Profile'
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>
                                    {isOAuthUser
                                        ? "Password change is not available for accounts signed in with Google."
                                        : "Update your password to keep your account secure."
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isOAuthUser ? (
                                    <Alert>
                                        <Lock className="h-4 w-4" />
                                        <AlertDescription>
                                            Your account is managed through Google OAuth. Password changes must be done through your Google account.
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                                placeholder="Enter your current password"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                                placeholder="Enter your new password"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                placeholder="Confirm your new password"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className='bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)]' disabled={updating}>
                                            {updating ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Changing Password...
                                                </>
                                            ) : (
                                                'Change Password'
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="account" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>
                                    View your account details and statistics.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">User ID</Label>
                                        <p className="text-sm">{userData.id}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Account Created</Label>
                                        <p className="text-sm">{new Date(userData.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                                        <p className="text-sm">{new Date(userData.updatedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
                                        <p className="text-sm">{isOAuthUser ? 'Google OAuth' : 'Email & Password'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    );
};

export default SettingsPage;