import AdminTopbar from './components/AdminTopbar';
import DataTable from './components/DataTable';

const contentItems = [
  { title: 'Homepage Hero', type: 'Page Content', status: 'Published' },
  { title: 'About Company Story', type: 'Page Content', status: 'Draft' },
  { title: 'Career Listings', type: 'Career', status: 'Published' },
  { title: 'Blog: Recruitment Trends', type: 'Blog Post', status: 'Review' },
];

export default function AdminContent() {
  return (
    <div className="space-y-6">
      <AdminTopbar pageTitle="Content Management" statsSummary={[
        { label: 'Published Pages', value: '18' },
        { label: 'Drafts', value: '6' },
        { label: 'SEO Updates', value: '12' },
      ]} />

      <DataTable
        title="CMS content, blocks and SEO metadata"
        columns={[
          { key: 'title', label: 'Content Title' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
        ]}
        rows={contentItems}
        action={<button className="rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500">Add Content</button>}
      />
    </div>
  );
}
