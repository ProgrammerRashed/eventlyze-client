

"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TParticipantUser } from "@/types/participantType";
import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../Shared/DateTimeFormat/formatDate";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TParticipantProps {
    participant: TParticipantUser[];
    user: any;
}

const ParticipantClientComponents = ({ participant, user }: TParticipantProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [participants, setParticipants] = useState<TParticipantUser[]>(participant);

    // Search functionality
    const filteredParticipants = participants?.filter((parti) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            parti?.user?.name.toLowerCase().includes(searchLower) ||
            parti?.user?.email.toLowerCase().includes(searchLower) ||
            parti?.event?.title.toLowerCase().includes(searchLower) ||
            parti?.event?.category.toLowerCase().includes(searchLower) ||
            parti?.status.toLowerCase().includes(searchLower)
        );
    });

    const getStatusBadge = (status: TParticipantUser["status"]) => {
        switch (status) {
            case "JOINED":
                return (
                    <Badge
                        variant="outline"
                        className="text-green-500 border-green-500 bg-green-500/10"
                    >
                        JOINED
                    </Badge>
                );
            case "REQUESTED":
                return (
                    <Badge
                        variant="outline"
                        className="text-destructive border-destructive bg-destructive/10"
                    >
                        REQUESTED
                    </Badge>
                );
            case "APPROVED":
                return (
                    <Badge
                        variant="outline"
                        className="text-blue-500 border-blue-500 bg-blue-500/10"
                    >
                        APPROVED
                    </Badge>
                );
            case "REJECTED":
                return (
                    <Badge
                        variant="outline"
                        className="text-yellow-500 border-yellow-500 bg-yellow-500/10"
                    >
                        REJECTED
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div>
            <Card className="shadow-md">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>All Participants</CardTitle>
                            <CardDescription>
                                Track and manage event participants
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search participants..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-md w-full sm:w-[200px]"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {
                                        user?.role === "ADMIN" && (
                                            <TableHead>Participantor</TableHead>
                                        )
                                    }
                                    <TableHead>Event Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joining Date</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredParticipants?.length > 0 ? (
                                    filteredParticipants?.map((parti) => (
                                        <TableRow key={parti.id}>
                                            {
                                                user?.role === "ADMIN" && (
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarFallback>{parti.user?.name?.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {parti.user?.name}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground text-yellow-600">
                                                                    {parti.user?.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                            <TableCell
                                                className="max-w-[150px] truncate"
                                                title={parti.event?.title}
                                            >
                                                {parti.event?.title}
                                            </TableCell>
                                            <TableCell>
                                                {parti.event?.category}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(parti.status)}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(parti.createdAt)} at {formatDate(parti.createdAt, "h:mm A")}
                                            </TableCell>
                                            <Link href={`/events/${parti?.eventId}`}>
                                                <TableCell className="text-center items-center justify-center flex">
                                                    <Button
                                                        variant="ghost"
                                                        className=" rounded-full just"
                                                    >
                                                        <Eye />
                                                    </Button>
                                                </TableCell>
                                            </Link>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                                                <div className="text-4xl">🎉</div>
                                                <h3 className="mt-4 text-lg font-medium text-white">No Participants</h3>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    You haven't joined any events.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ParticipantClientComponents;