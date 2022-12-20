import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async input(id: string) {
    const isExiting = await this.prisma.attendance.findFirst({
      where: {
        AND: [
          {
            out_time: null,
          },
          {
            student_id: id,
          },
        ],
      },
    });
    if (isExiting) {
      await this.prisma.attendance.update({
        where: {
          id: isExiting.id,
        },
        data: {
          out_time: new Date(),
        },
      });
    } else {
      await this.prisma.attendance.create({
        data: {
          student_id: id,
          in_time: new Date().toISOString(),
          out_time: null,
        },
      });
    }
    const dt = await this.getData();
    const { name } = await this.prisma.student.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
      },
    });
    return {
      name,
      data: dt,
    };
  }
  async getData() {
    const dat = await Promise.all([
      this.prisma.attendance.count({
        where: {
          in_time: {
            gte: new Date(
              new Date(
                new Date(new Date().setHours(0)).setMinutes(0),
              ).setSeconds(0),
            ),
          },
          out_time: {
            lte: new Date(
              new Date(
                new Date(new Date().setHours(24)).setMinutes(60),
              ).setSeconds(60),
            ),
          },

          student: {
            type: 'student',
          },
        },
      }),
      this.prisma.attendance.count({
        where: {
          in_time: {
            gte: new Date(
              new Date(
                new Date(new Date().setHours(0)).setMinutes(0),
              ).setSeconds(0),
            ),
          },
          out_time: {
            lte: new Date(
              new Date(
                new Date(new Date().setHours(24)).setMinutes(60),
              ).setSeconds(60),
            ),
          },
          student: {
            type: 'staff',
          },
        },
      }),
      this.prisma.attendance.count({
        where: {
          in_time: {
            gte: new Date(
              new Date(
                new Date(new Date().setHours(0)).setMinutes(0),
              ).setSeconds(0),
            ),
          },
          out_time: null,
          student: {
            type: 'student',
          },
        },
      }),
      this.prisma.attendance.count({
        where: {
          in_time: {
            gte: new Date(
              new Date(
                new Date(new Date().setHours(0)).setMinutes(0),
              ).setSeconds(0),
            ),
          },
          out_time: null,
          student: {
            type: 'staff',
          },
        },
      }),
    ]);
    return {
      today: {
        student: dat[0],
        staff: dat[1],
      },
      inside: {
        student: dat[2],
        staff: dat[3],
      },
    };
  }
  async validateId(id: string) {
    const count = await this.prisma.student.count({
      where: {
        id,
      },
    });
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
  async getLibrary() {
    return this.prisma.data.findFirst({
      where: {
        id: 1,
      },
    });
  }
}
