import { PrismaClient } from "@prisma/client";
import { convertDateFormat, convertDateFormatToVN } from "../logic/logic.js";

const prisma = new PrismaClient();

export const newAction = async (req, res) => {
  try {
    const { device, action } = req.body;
    let result, topicPub, topicSub, message;

    if (device === "light" || device === "fan") {
      topicPub = `${device}control`;
      topicSub = `${device}status`;
      message = action.toUpperCase();

      const deviceName = device.toUpperCase();

      result = await prisma.actionHistory.create({
        data: {
          device: deviceName,
          action,
        },
      });

      res.status(200).json({
        message: "Action completed successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        error: "Invalid device or action type",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getDataAction = async (req, res) => {
  try {
    const { deviceName, dayStart, dayEnd, page, limit } = req.query;

    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: "Invalid 'page' parameter" });
    }

    const limitNumber = parseInt(limit, 10);
    const next = (pageNumber - 1) * limitNumber;

    let valueSearch = {};
    if (deviceName && deviceName !== "all" && dayStart && dayEnd) {
      const startDay = convertDateFormat(dayStart);
      const endDay = convertDateFormat(dayEnd);

      valueSearch = {
        AND: [
          {
            createdAt: { gte: new Date(startDay), lt: new Date(endDay) },
          },
          {
            device: deviceName,
          },
        ],
      };
    } else if (dayStart && dayEnd) {
      const startDay = convertDateFormat(dayStart);
      const endDay = convertDateFormat(dayEnd);

      valueSearch = {
        createdAt: { gte: new Date(startDay), lt: new Date(endDay) },
      };
    } else if (!dayStart && !dayEnd && deviceName && deviceName !== "all") {
      valueSearch = { device: deviceName };
    }

    const totalCount = await prisma.actionHistory.count({
      where: valueSearch,
    });

    const data = await prisma.actionHistory.findMany({
      where: valueSearch,
      skip: next,
      take: limitNumber,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data || data.length === 0) {
      return res.status(404).json({
        error: `No data found${
          dayStart && dayEnd ? ` from ${dayStart} to ${dayEnd}` : ""
        }`,
      });
    }

    data.forEach((item) => {
      item.createdAt = convertDateFormatToVN("year", item.createdAt);
    });

    return res.status(200).json({ data, totalCount });
  } catch (error) {
    console.error("Error searching data in actionHistory:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getFirstAction = async (req, res) => {
  try {
    const data = await prisma.actionHistory.findMany({
      distinct: ["device"], // Lấy các bản ghi không trùng lặp theo thuộc tính 'action'
      orderBy: {
        createdAt: "desc", // Sắp xếp theo thời gian mới nhất
      },
      take: 2, // Lấy hai bản ghi đầu tiên
    });

    if (!data || data.length < 2) {
      return res.status(404).json({ error: "Not enough unique data found" });
    }

    data.forEach((item) => {
      item.createdAt = convertDateFormatToVN("time", item.createdAt);
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
