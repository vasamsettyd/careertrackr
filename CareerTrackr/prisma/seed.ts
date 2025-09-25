import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = 4;
async function main() {
  console.log("🌱 Seeding jobs for userId = ", userId);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User with id = 1 does not exist. Please create a user first.");
  }

  let remoteTag = await prisma.tag.findFirst({
    where: { userId: userId, name: "remote" },
  });

  let priorityTag = await prisma.tag.findFirst({
    where: { userId: userId, name: "priority" },
  });

  let frontendTag = await prisma.tag.findFirst({
    where: { userId: userId, name: "frontend" },
  });

  if (!remoteTag) {
    remoteTag = await prisma.tag.create({
      data: {
        userId: userId,
        name: "remote",
      },
    });
  }

  if (!priorityTag) {
    priorityTag = await prisma.tag.create({
      data: {
        userId: userId,
        name: "priority",
      },
    });
  }

  if (!frontendTag) {
    frontendTag = await prisma.tag.create({
      data: {
        userId: userId,
        name: "frontend",
      },
    });
  }

  console.log(`✅ Using tags: ${remoteTag.name}, ${priorityTag.name}, ${frontendTag.name}`);

  const jobs = [
    {
      companyName: "Google",
      role: "Frontend Engineer",
      jobTitle: "Frontend Engineer",
      address: "Mountain View, CA",
      appliedDate: new Date("2025-01-10"),
      status: "applied" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 150000,
      jobUrl: "https://careers.google.com/job/frontend",
      notes: "Referred by Alice",
      tags: [{ tagId: remoteTag.id }, { tagId: frontendTag.id }],
    },
    {
      companyName: "Amazon",
      role: "Backend Developer",
      jobTitle: "Backend Developer",
      address: "Seattle, WA",
      appliedDate: new Date("2025-02-01"),
      status: "interview" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 140000,
      jobUrl: "https://amazon.jobs/backend-dev",
      notes: "First round cleared",
      tags: [{ tagId: remoteTag.id }, { tagId: priorityTag.id }],
    },
    {
      companyName: "Microsoft",
      role: "Software Engineer",
      jobTitle: "Software Engineer II",
      address: "Redmond, WA",
      appliedDate: new Date("2025-01-15"),
      status: "offer" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 160000,
      jobUrl: "https://careers.microsoft.com",
      notes: "Great offer package",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Meta",
      role: "Frontend Engineer",
      jobTitle: "Frontend Engineer",
      address: "Menlo Park, CA",
      appliedDate: new Date("2025-01-20"),
      status: "rejected" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 170000,
      jobUrl: "https://www.metacareers.com",
      notes: "Didn't pass system design round",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "Netflix",
      role: "Senior Developer",
      jobTitle: "Senior Software Engineer",
      address: "Los Gatos, CA",
      appliedDate: new Date("2025-01-25"),
      status: "saved" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 180000,
      jobUrl: "https://jobs.netflix.com",
      notes: "Interesting role, need to research more",
      tags: [{ tagId: remoteTag.id }],
    },
    {
      companyName: "Airbnb",
      role: "Full Stack Engineer",
      jobTitle: "Full Stack Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-01-28"),
      status: "closed" as const,
      jobType: "full_time" as const,
      locationType: "hybrid" as const,
      salary: 155000,
      jobUrl: "https://careers.airbnb.com",
      notes: "Position was filled internally",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "Tesla",
      role: "Backend Engineer",
      jobTitle: "Backend Software Engineer",
      address: "Austin, TX",
      appliedDate: new Date("2025-02-05"),
      status: "applied" as const,
      jobType: "full_time" as const,
      locationType: "hybrid" as const,
      salary: 145000,
      jobUrl: "https://www.tesla.com/careers",
      notes: "Applied through referral",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Uber",
      role: "Mobile Engineer",
      jobTitle: "Senior Mobile Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-02-10"),
      status: "interview" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 165000,
      jobUrl: "https://www.uber.com/careers",
      notes: "Technical interview scheduled",
      tags: [{ tagId: remoteTag.id }],
    },
    {
      companyName: "Spotify",
      role: "Data Engineer",
      jobTitle: "Data Engineer",
      address: "New York, NY",
      appliedDate: new Date("2025-02-12"),
      status: "offer" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 150000,
      jobUrl: "https://www.lifeatspotify.com",
      notes: "Exciting opportunity in music tech",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "Stripe",
      role: "API Engineer",
      jobTitle: "Senior API Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-02-15"),
      status: "rejected" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 175000,
      jobUrl: "https://stripe.com/jobs",
      notes: "Technical skills not aligned",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Shopify",
      role: "Frontend Developer",
      jobTitle: "Senior Frontend Developer",
      address: "Ottawa, Canada",
      appliedDate: new Date("2025-02-18"),
      status: "saved" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 135000,
      jobUrl: "https://www.shopify.com/careers",
      notes: "Remote position in Canada",
      tags: [{ tagId: remoteTag.id }],
    },
    {
      companyName: "GitHub",
      role: "DevOps Engineer",
      jobTitle: "Senior DevOps Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-02-20"),
      status: "closed" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 160000,
      jobUrl: "https://github.com/careers",
      notes: "Role was cancelled",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "Slack",
      role: "Backend Engineer",
      jobTitle: "Backend Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-02-22"),
      status: "applied" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 155000,
      jobUrl: "https://slack.com/careers",
      notes: "Applied through company website",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Zoom",
      role: "Full Stack Engineer",
      jobTitle: "Full Stack Software Engineer",
      address: "San Jose, CA",
      appliedDate: new Date("2025-02-25"),
      status: "interview" as const,
      jobType: "full_time" as const,
      locationType: "hybrid" as const,
      salary: 140000,
      jobUrl: "https://careers.zoom.us",
      notes: "First interview went well",
      tags: [{ tagId: remoteTag.id }],
    },
    {
      companyName: "Pinterest",
      role: "Frontend Engineer",
      jobTitle: "Frontend Software Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-02-28"),
      status: "offer" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 165000,
      jobUrl: "https://careers.pinterest.com",
      notes: "Great company culture",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "LinkedIn",
      role: "Software Engineer",
      jobTitle: "Senior Software Engineer",
      address: "Sunnyvale, CA",
      appliedDate: new Date("2025-03-01"),
      status: "rejected" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 170000,
      jobUrl: "https://careers.linkedin.com",
      notes: "Coding challenge was challenging",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Dropbox",
      role: "Backend Engineer",
      jobTitle: "Backend Software Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-03-03"),
      status: "saved" as const,
      jobType: "full_time" as const,
      locationType: "remote" as const,
      salary: 145000,
      jobUrl: "https://www.dropbox.com/jobs",
      notes: "Interesting cloud storage company",
      tags: [{ tagId: remoteTag.id }],
    },
    {
      companyName: "Twilio",
      role: "API Engineer",
      jobTitle: "Senior API Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-03-05"),
      status: "closed" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 155000,
      jobUrl: "https://www.twilio.com/company/jobs",
      notes: "Hiring freeze announced",
      tags: [{ tagId: frontendTag.id }],
    },
    {
      companyName: "Square",
      role: "Mobile Engineer",
      jobTitle: "Senior Mobile Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-03-08"),
      status: "applied" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 160000,
      jobUrl: "https://careers.squareup.com",
      notes: "Fintech company, interesting domain",
      tags: [{ tagId: priorityTag.id }],
    },
    {
      companyName: "Coinbase",
      role: "Blockchain Engineer",
      jobTitle: "Senior Blockchain Engineer",
      address: "San Francisco, CA",
      appliedDate: new Date("2025-03-12"),
      status: "offer" as const,
      jobType: "full_time" as const,
      locationType: "on_site" as const,
      salary: 180000,
      jobUrl: "https://www.coinbase.com/careers",
      notes: "Crypto company with good benefits",
      tags: [{ tagId: remoteTag.id }],
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: {
        userId: userId,
        companyName: job.companyName,
        role: job.role,
        jobTitle: job.jobTitle,
        address: job.address,
        appliedDate: job.appliedDate,
        status: job.status,
        jobType: job.jobType,
        salary: job.salary,
        jobUrl: job.jobUrl,
        locationType: job.locationType,
        notes: job.notes,
        tags: {
          create: job.tags,
        },
      },
    });
  }

  console.log("✅ Seed complete: 20 jobs for userId = ", userId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });