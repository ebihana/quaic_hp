import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DataPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dataset Description</CardTitle>
          <CardDescription>Information about the competition dataset</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The dataset consists of 60,000 32x32 color images divided into 10 classes. There are 50,000 training images
            and 10,000 test images. The classes are completely balanced, with 5,000 training images per class and 1,000
            test images per class.
          </p>
          <p>The 10 classes are:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Airplane</li>
            <li>Automobile</li>
            <li>Bird</li>
            <li>Cat</li>
            <li>Deer</li>
            <li>Dog</li>
            <li>Frog</li>
            <li>Horse</li>
            <li>Ship</li>
            <li>Truck</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Download Files</CardTitle>
          <CardDescription>Download the dataset files for the competition</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">training_data.zip</TableCell>
                <TableCell>162.6 MB</TableCell>
                <TableCell>May 15, 2025</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">test_data.zip</TableCell>
                <TableCell>32.5 MB</TableCell>
                <TableCell>May 15, 2025</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">sample_submission.csv</TableCell>
                <TableCell>156 KB</TableCell>
                <TableCell>May 15, 2025</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <FileDown className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
