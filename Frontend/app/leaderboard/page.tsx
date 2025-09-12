import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="public">
        <TabsList>
          <TabsTrigger value="public">Public Leaderboard</TabsTrigger>
          <TabsTrigger value="private">Private Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="public" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Public Leaderboard</CardTitle>
              <CardDescription>Rankings based on 30% of the test data</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="hidden md:table-cell">Submissions</TableHead>
                    <TableHead className="hidden md:table-cell">Last Submission</TableHead>
                    <TableHead className="hidden md:table-cell">Game Record</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">1</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>DL</AvatarFallback>
                        </Avatar>
                        <div>DeepLearners</div>
                      </div>
                    </TableCell>
                    <TableCell>0.9587</TableCell>
                    <TableCell className="hidden md:table-cell">12</TableCell>
                    <TableCell className="hidden md:table-cell">May 21, 2025</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Game Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Game Record</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-4">
                            <Image
                              src="/images/game_record.png"
                              alt="Game Record"
                              width={540}
                              height={360}
                              className="rounded-lg border"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">2</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>AI Masters</div>
                      </div>
                    </TableCell>
                    <TableCell>0.9532</TableCell>
                    <TableCell className="hidden md:table-cell">8</TableCell>
                    <TableCell className="hidden md:table-cell">May 20, 2025</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Game Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Game Record</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-4">
                            <Image
                              src="/images/game_record.png"
                              alt="Game Record"
                              width={540}
                              height={360}
                              className="rounded-lg border"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Badge className="bg-amber-50 text-amber-800 hover:bg-amber-50 border-amber-200">3</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>CV</AvatarFallback>
                        </Avatar>
                        <div>Computer Vision Experts</div>
                      </div>
                    </TableCell>
                    <TableCell>0.9498</TableCell>
                    <TableCell className="hidden md:table-cell">15</TableCell>
                    <TableCell className="hidden md:table-cell">May 19, 2025</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Game Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Game Record</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-4">
                            <Image
                              src="/images/game_record.png"
                              alt="Game Record"
                              width={540}
                              height={360}
                              className="rounded-lg border"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">4</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                        <div>ML Enthusiasts</div>
                      </div>
                    </TableCell>
                    <TableCell>0.9476</TableCell>
                    <TableCell className="hidden md:table-cell">7</TableCell>
                    <TableCell className="hidden md:table-cell">May 18, 2025</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Game Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Game Record</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-4">
                            <Image
                              src="/images/game_record.png"
                              alt="Game Record"
                              width={540}
                              height={360}
                              className="rounded-lg border"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">5</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>NN</AvatarFallback>
                        </Avatar>
                        <div>Neural Ninjas</div>
                      </div>
                    </TableCell>
                    <TableCell>0.9455</TableCell>
                    <TableCell className="hidden md:table-cell">10</TableCell>
                    <TableCell className="hidden md:table-cell">May 17, 2025</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            Game Record
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Game Record</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center p-4">
                            <Image
                              src="/images/game_record.png"
                              alt="Game Record"
                              width={540}
                              height={360}
                              className="rounded-lg border"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="private" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Private Leaderboard</CardTitle>
              <CardDescription>Final rankings will be revealed when the competition ends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-2">
                  The private leaderboard will be available after the competition ends on July 22, 2025.
                </p>
                <p className="text-sm text-muted-foreground">
                  Final rankings will be determined using the remaining 70% of the test data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
