import Image from 'next/image';
import Link from 'next/link';
import { Models } from 'node-appwrite';

import ActionDropdown from '@/components/ActionDropdown';
import { Chart } from '@/components/Chart';
import { FormattedDateTime } from '@/components/FormattedDateTime';
import { Thumbnail } from '@/components/Thumbnail';
import { Separator } from '@/components/ui/separator';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { convertFileSize, getUsageSummary } from '@/lib/utils';

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      {/* Recent files uploaded */}
      <section className="dashboard-recent-files bg-black">
        <h2 className="h3 xl:h2 text-white">Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <div>
                <Link
                  href={file.url}
                  target="_blank"
                  className="flex items-center gap-3"
                  key={file.$id}
                >
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                  />

                  <div className="recent-file-details">
                    <div className="flex flex-col gap-1">
                      <p className="recent-file-name">{file.name}</p>
                      <FormattedDateTime
                        date={file.$createdAt}
                        className="caption"
                      />
                    </div>
                    <ActionDropdown file={file} />
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
      <section className="bg-black">
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary, index) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card border border-white rounded-xl hover:bg-brand-100"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  {/* <Image
                    src={summary.icon}
                    width={5}
                    height={5}
                    alt="uploaded image"
                    className="summary-type-icon"
                  /> */}

                  <p className="font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {summary.title}
                  </p>

                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{'summary.title'}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center text-white"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
